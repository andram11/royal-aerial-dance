import { convertToUTC } from "../utils";
import { useState } from "react";
import Button from "./button";
interface CreateModalProps {
  createComponent: string;
  isOpen: boolean;
  onSubmit?: (createData: any) => Promise<any>;
  onTransactionSubmit?: (createData: any) => Promise<any>;
  onClose: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({
  createComponent,
  isOpen,
  onSubmit,
  onClose,
  onTransactionSubmit,
}) => {
  // Manage input state for each course field
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [location, setLocation] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startDate, setStartDate] = useState<string | Date>("");
  const [endDate, setEndDate] = useState<string | Date>("");
  const [recurrent, setRecurrent] = useState("");
  const [recurrenceType, setRecurrenceType] = useState("");
  const [timeslot, setTimeslot] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [teacher, setTeacher] = useState("");
  const [status, setStatus] = useState("");
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);
  //Input state for each transaction field
  const [courseId, setCourseId] = useState("");
  const [courseQuantity, setCourseQuantity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [participantFirstName, setParticipantFirstName] = useState("");
  const [participantLastName, setParticipantLastName] = useState("");
  const [participantPhoneNumber, setParticipantPhoneNumber] = useState("");
  const [participantBirthDate, setParticipantBirthDate] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [transactionCreateStatus, setTransactionCreateStatus] = useState<
    string | null
  >(null);

  //Handle course creation submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = {
      title,
      category,
      level,
      location,
      dayOfWeek,
      startDate,
      endDate,
      recurrent: recurrent ? true : false,
      recurrenceType,
      timeslot,
      price,
      stock,
      teacher,
      status,
    };
    try {
      const response = onSubmit
        ? await onSubmit(updatedData)
        : setUpdateStatus("Something went wrong.");
      !response.error
        ? setUpdateStatus("success")
        : setUpdateStatus(response.error);
    } catch (err) {
      setUpdateStatus(err as string);
    }
  };

  //Handle transaction creation submit
  const handleTransactionSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const transactionData = {
      courseDetails: {
        courseId: courseId,
        quantity: courseQuantity,
      },
      paymentMethod: paymentMethod,
      status: transactionStatus,
      paymentId: paymentId,
      participantDetails: {
        firstName: participantFirstName,
        lastName: participantLastName,
        phoneNumber: participantPhoneNumber,
        email: participantEmail,
        birthDate: participantBirthDate,
      },
    };

    try {
      const response = onTransactionSubmit
        ? await onTransactionSubmit(transactionData)
        : setTransactionCreateStatus("Something went wrong.");
      !response.error
        ? setTransactionCreateStatus("success")
        : setTransactionCreateStatus(response.error);
    } catch (err) {
      setTransactionCreateStatus(err as string);
    }
  };

  if (!isOpen) return null;
  return (
    <div>
      {createComponent === "course" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
            <button onClick={onClose} className="text-tertiary-200 float-right">
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
            {updateStatus === "success" ? (
              <p className="text-green-600 font-bold my-2">
                The course has been successfully created.
              </p>
            ) : (
              <p className="text-red-600 font-bold my-2">{updateStatus}</p>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 text-left gap-x-8 gap-6 py-4 text-md"
            >
              <div>
                <label htmlFor="dropdownInput">Category </label>
                <select
                  required
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mb-2 border-2 p-3 rounded-lg shadow-lg"
                  id="dropdownInput"
                >
                  <option defaultValue="">Select a category</option>
                  <option value="pole dance">pole dance</option>
                  <option value="aerial hoop">aerial hoop</option>
                  <option value="yoga">yoga</option>
                  <option value="contemporary dance">contemporary dance</option>
                  <option value="heels dance">heels dance</option>
                </select>
              </div>
              <div>
                <label>Title </label>
                <input
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                ></input>
              </div>
              <div>
                <label htmlFor="dropdownInput">Level </label>
                <select
                  required
                  onChange={(e) => setLevel(e.target.value)}
                  className="mb-2 w-full border-2 p-3 rounded-lg shadow-lg"
                  id="dropdownInput"
                >
                  <option defaultValue="">Select a level</option>
                  <option value="beginner">beginner</option>
                  <option value="intermediate">intermediate</option>
                  <option value="advanced">advanced</option>
                  <option value="all levels">all levels</option>
                  <option value="elite">elite</option>
                </select>
              </div>
              <div>
                <label>Location</label>
                <input
                  required
                  onChange={(e) => setLocation(e.target.value)}
                  className="mb-2 w-full border-2 p-2 rounded-lg shadow-lg"
                  type="text"
                ></input>
              </div>
              <div>
                <label>Day of the week</label>
                <select
                  required
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  className="mb-2 w-full border-2 p-3 rounded-lg shadow-lg"
                  id="dropdownInput"
                >
                  <option defaultValue="">Select day of the week</option>
                  <option value="monday">monday</option>
                  <option value="tuesday">tuesday</option>
                  <option value="wednesday">wednesday</option>
                  <option value="thursday">thursday</option>
                  <option value="friday">friday</option>
                  <option value="saturday">saturday</option>
                  <option value="sunday">sunday</option>
                </select>
              </div>
              <div>
                <label>Start date</label>
                <input
                  required
                  onChange={(e) => setStartDate(convertToUTC(e.target.value))}
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                  defaultValue="dd/mm/yyyy"
                ></input>
              </div>
              <div>
                <label>End date</label>
                <input
                  required
                  onChange={(e) => setEndDate(convertToUTC(e.target.value))}
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                  defaultValue="dd/mm/yyyy"
                ></input>
              </div>
              <div>
                <label>Recurrent</label>
                <select
                  required
                  onChange={(e) => setRecurrent(e.target.value.toString())}
                  className="w-full mb-2 border-2 p-3 rounded-lg shadow-lg"
                  id="dropdownInput"
                >
                  <option defaultValue="">Select recurrence</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
              <div>
                <label>Recurrence type</label>
                <select
                  required
                  onChange={(e) => setRecurrenceType(e.target.value)}
                  className="w-full mb-2 border-2 p-3 rounded-lg shadow-lg"
                  id="dropdownInput"
                >
                  <option defaultValue="">Select a recurrence type</option>
                  <option value="weekly">weekly</option>
                  <option value="biMonthly">biMonthly</option>
                  <option value="monthly">monthly</option>
                  <option value="oneTime">oneTime</option>
                </select>
              </div>
              <div>
                <label>Timeslot</label>
                <input
                  defaultValue="HH:MM-HH:MM"
                  required
                  onChange={(e) => setTimeslot(e.target.value)}
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                  type="text"
                ></input>
              </div>
              <div>
                <label>Price</label>
                <input
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                  type="text"
                ></input>
              </div>
              <div>
                <label>Stock</label>
                <input
                  required
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                  type="text"
                ></input>
              </div>
              <div>
                <label>Teacher</label>
                <input
                  required
                  onChange={(e) => setTeacher(e.target.value)}
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                  type="text"
                ></input>
              </div>
              <div>
                <label>Status: </label>
                <select
                  required
                  onChange={(e) => setStatus(e.target.value)}
                  id="dropdownInput"
                  className="w-full mb-2 border-2 p-3 rounded-lg shadow-lg"
                >
                  <option defaultValue="">Select a status</option>
                  <option value="active">active</option>
                  <option value="cancelled">cancelled</option>
                  <option value="inactive">inactive</option>
                </select>
              </div>
              <Button text="Cancel" onClick={onClose} />
              <Button type="submit" text="Submit" />
            </form>
          </div>
        </div>
      )}
      {createComponent === "transactions" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
            <button onClick={onClose} className="text-tertiary-200 float-right">
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4">Create New Transaction</h2>
            {transactionCreateStatus === "success" ? (
              <p className="text-green-600 font-bold my-2">
                The transaction has been successfully created.
              </p>
            ) : (
              <p className="text-red-600 font-bold my-2">
                {transactionCreateStatus}
              </p>
            )}

            <form
              onSubmit={handleTransactionSubmit}
              className="grid grid-cols-2 text-left gap-x-8 gap-6 py-4 text-md"
            >
              <div>
                <label>CourseId </label>
                <input
                  required
                  onChange={(e) => setCourseId(e.target.value)}
                  type="text"
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                ></input>
              </div>
              <div>
                <label>Course quantity </label>
                <input
                  required
                  onChange={(e) => setCourseQuantity(e.target.value)}
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                ></input>
              </div>
              <div>
                <label>Status </label>
                <select
                  required
                  onChange={(e) => setTransactionStatus(e.target.value)}
                  className="mb-2 w-full border-2 p-3 rounded-lg shadow-lg"
                >
                  <option defaultValue="">Select a status</option>
                  <option value="initiated">initiated</option>
                  <option value="succeeded">succeeded</option>
                  <option value="failed">failed</option>
                </select>
              </div>
              <div>
                <label>Payment Method</label>
                <select
                  required
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mb-2 w-full border-2 p-3 rounded-lg shadow-lg"
                  id="dropdownInput"
                >
                  <option defaultValue="">Select payment method</option>
                  <option value="Stripe">Stripe</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div>
                <label>Payment Id</label>
                <input
                  required
                  onChange={(e) => setPaymentId(e.target.value)}
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                  type="text"
                ></input>
              </div>
              <div>
                <label>Participant First Name</label>
                <input
                  type="text"
                  required
                  onChange={(e) => setParticipantFirstName(e.target.value)}
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                ></input>
              </div>
              <div>
                <label>Participant Last Name</label>
                <input
                  required
                  onChange={(e) => setParticipantLastName(e.target.value)}
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                  type="text"
                ></input>
              </div>
              <div>
                <label>Participant Birthdate</label>
                <input
                  required
                  type="date"
                  defaultValue="dd/mm/yyyy"
                  onChange={(e) => setParticipantBirthDate(e.target.value)}
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                ></input>
              </div>
              <div>
                <label>Participant Phone Number</label>
                <input
                  required
                  type="text"
                  onChange={(e) => setParticipantPhoneNumber(e.target.value)}
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                ></input>
              </div>
              <div>
                <label>Participant Email </label>
                <input
                  required
                  type="email"
                  onChange={(e) => setParticipantEmail(e.target.value)}
                  className="w-full mb-2 border-2 p-2 rounded-lg shadow-lg"
                ></input>
              </div>
              <Button text="Cancel" onClick={onClose} />
              <Button type="submit" text="Submit" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateModal;
