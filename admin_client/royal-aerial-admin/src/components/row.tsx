import { FaEye, FaEdit, FaTrash, FaDownload  } from "react-icons/fa";

interface RowProps {
    rowIcons?: string[];
    rowActions: Array<{[key: string]: () => void }>;
    itemId: string;
  }



  const RowComponent: React.FC<RowProps> = ({ rowIcons, rowActions, itemId }) => {

    const handleActionClick = (icon: string) => {
        // Find the action object that contains the icon key
        const action = rowActions.find(actionObj => icon in actionObj);
    
        if (action) {
          // Execute the corresponding action
          action[icon]();
        }
      };

    const renderIcon = (icon: string) => {
        switch (icon) {
          case "view":
            return <FaEye className="text-secondary-200" />;
          case "edit":
            return <FaEdit className="text-secondary-200" />;
          case "delete":
            return <FaTrash className="text-secondary-200" />;
          case "download":
            return <FaDownload className="text-secondary-200" />;
          default:
            return null;
        }
      };
    return (
      <td className="text-md text-center border-b border-primary-100">
        <div className="flex justify-center space-x-3">
          {rowIcons&& rowIcons.map((icon, index) => (
            <span
              key={index}
              onClick={() => handleActionClick(icon)} // Execute the corresponding action
              className="cursor-pointer"
            >
              {renderIcon(icon)} {/* Function to render the icon based on type */}
            </span>
          ))}
        </div>
      </td>
    );
  };
  
  export default RowComponent
