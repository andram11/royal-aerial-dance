import styles from './userForm.module.css'

interface UserFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    buttonText: string
  }

const UserForm: React.FC<UserFormProps>= ({handleSubmit, handleChange, buttonText})=> {
    return (
        <div>
         
           <form onSubmit={handleSubmit}>
            <input
            type="email"
            id="username"
            name="username"
            required
            onChange={handleChange}
            >
            </input>
            <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
       
            >
            </input>
           <button type="submit">{buttonText}</button>
            
           </form>
        </div>
    )
}

export default UserForm