import React, { useEffect } from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalBox = styled.div`
    width: 600px;
    height: 200px;
    background: #643DD2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    font-size: 30px;
    font-weight: 500;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Modal = ({ isOpen, children, onClose }) => {
  useEffect(() => {
    if (isOpen) {
        const timer = setTimeout(onClose, 5000); 
        return () => clearTimeout(timer); 
    }
  }, [isOpen, onClose]);

if (!isOpen) return null;

    return (
        <ModalBackdrop onClick={onClose}>
            <ModalBox onClick={e => e.stopPropagation()}>
                {children}
            </ModalBox>
        </ModalBackdrop>
    );
};

export default Modal;


//=> 추후에 shared로 이동