import styled from 'styled-components';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css'

const IconButton = ({ onDelete }) => {

    const IconButton = styled.button`
        background-color: #0b5ed7;
        border:0;
        color:white;
        font-size: 24px;
        border-radius: 5px;
    `
    return (
        <IconButton onClick={(e) => {
            e.stopPropagation();
            onDelete();
        }}>
            <i className="bi bi-trash-fill"></i>
        </IconButton>
    )
}

export default IconButton;