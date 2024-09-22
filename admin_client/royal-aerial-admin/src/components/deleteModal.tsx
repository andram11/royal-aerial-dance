import { useState } from "react";
import Button from "./button";
interface DeleteModalProps {
  deleteComponent: string;
  details: any;
  isOpen: boolean;
  onSubmit?: (courseId: string) => Promise<any>;
  onTransactionSubmit?: (id: string)=> Promise<any>
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  details,
  deleteComponent,
  isOpen,
  onSubmit,
  onClose,
  onTransactionSubmit
}) => {
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (deleteComponent==="courses" && onSubmit) {
        await onSubmit(details.courseId)
      } 
      if (deleteComponent==="transactions" && onTransactionSubmit){
        await onTransactionSubmit(details.id)
      }
      setDeleteStatus("success");
      // Delay the closing of the modal by 5 seconds
      setTimeout(() => {
        onClose();
      }, 5000);
    } catch (err) {
      setDeleteStatus(`An error occurred.Error: ${err}`);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <button onClick={onClose} className="text-tertiary-200 float-right">
          Close
        </button>

        
          <>
            <h1 className="text-2xl font-bold mb-4 text-red-600">
              Deleting {deleteComponent==="course"? "course id: ": "transaction id: "} 
              {deleteComponent==="course"? details.courseId: details.id} <br></br>
              {deleteComponent==="course"&& details?.title}
            </h1>
          </>
       

        <p className="text-lg">
          Are you sure you want to delete this item? This operation is
          irreversible!
        </p>

        {/* Display success or error message */}
        {deleteStatus === "success" && (
          <p className="text-green-600 font-bold my-2">
            The {deleteComponent==="courses"? "course": "transaction"} has been successfully deleted.
          </p>
        )}
        {deleteStatus && deleteStatus !== "success" && (
          <p className="text-red-600 font-bold my-2">{deleteStatus}</p>
        )}

        {/* Form wrapper to handle submission */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mt-6">
            <Button type="submit" text="Delete" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;
