import { useEffect, useState } from "react";
import { getParticipantsByCourseId } from "../api/api";
import { capitalizeFirstLetter } from "../utils";
import Table from "./table";

interface ModalProps{
    details: any;
    isOpen: boolean;
    onClose: ()=> void;
    tabs?: string;
    itemsFor?: string;

}

const Modal: React.FC<ModalProps>= ({
    details,
    isOpen,
    onClose,
    tabs,

})=> {


    //Manage tabs
    const [activeTab, setActiveTab]= useState<string>('details')
    const [participantData, setParticipantData]= useState<any[] | null>(null)

    //Fetch participant data
    useEffect(()=> {
        if (activeTab==="participants"){
            if (details.courseId) {
                getParticipantsByCourseId(details.courseId).then((data)=> setParticipantData(data.items.filter(item=> item.status==="succeeded"))).catch((err)=> console.error(err))
            }
           
        }
    }, [activeTab])
 

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
            <button onClick={onClose} className="text-tertiary-200 float-right">
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4">Item Details</h2>
    
            {/* Tab Buttons */}
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 ${activeTab === "details" ? "font-bold border-b-2 border-primary" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              {tabs && (
                <button
                  className={`px-4 py-2 ${activeTab === tabs ? "font-bold border-b-2 border-primary" : ""}`}
                  onClick={() => setActiveTab('participants')}
                >
                  {capitalizeFirstLetter(tabs)}
                </button>
              )}
            </div>
    
            {/* Tab Content */}
            {activeTab === "details" ? (
              // Render item details
              <div className="grid grid-cols-2 text-left gap-x-8 gap-6 py-4 text-md">
                {Object.keys(details).map((key, index) => (
                  <div key={index} className="mb-2 border-2 p-2 rounded-lg shadow-lg">
                    <strong className="text-secondary-200 mr-4">{capitalizeFirstLetter(key)}: </strong> {capitalizeFirstLetter(String(details[key]))}
                  </div>

                ))}
              </div>
            ) : (
              // Render the second tab's content (e.g., participants)
              <div>
                {participantData ? (
                    participantData.length> 0? ( <Table
                        headers={["First Name", "Last Name", "Phone Number", "Email"]} // Adjust headers as needed
                        data={participantData.map((participant) => ({
                            data: [
                                participant.participantDetails.firstName,
                          participant.participantDetails.lastName,
                          participant.participantDetails.phoneNumber,
                          participant.participantDetails.email,
                            ]
                        }
                          
                    ))}
                      />) : (<div>No participants with a confirmed participation status.</div>)
                 
                ) : (
                  <div>Loading {tabs}...</div>
                )}
              </div>
            )}
          </div>
        </div>
    
      );
    };
    
    export default Modal;