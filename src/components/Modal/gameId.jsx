import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import CloseCircle from "../Icon/CloseCircle";

export const modalZoomInAnimation = () => keyframes`
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
`;

export const modalZoomOutAnimation = () => keyframes`
    from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background: #1a2036;
  border-radius: 5px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 50px;
  min-width: 100px;
  @media all and (max-width: 640px) {
    min-height: 350px;
    min-height: unset;
  }
`;

const CloseWrapper = styled.button`
  border: none;
  background: transparent;
  right: 10px;
  position: absolute;
  top: 10px;
  cursor: pointer;
`;

export default function GameIdModal({ id, open, handleClose }) {
 
  return (
    <>
      {open && (
        <Wrapper
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <div className="flex items-center justify-center">
            <Card>
              <CloseWrapper>
                <CloseCircle onClick={handleClose} />
              </CloseWrapper>
              <div className="flex items-center">
                <h3 className="text-2xl text-white font-semibold m-4 text-center">{id}</h3>
              </div>
            </Card>
          </div>
        </Wrapper>
      )}
    </>
  );
}
