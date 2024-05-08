import { FC, ReactNode } from "react";

interface ModalProps {
  tab: ReactNode; 
}

export const Modal: FC<ModalProps> = ({ tab }) => {
  return (
    <div className="w-full h-screen bg-slate-600 fixed top-0 left-0 z-20 bg-opacity-40 flex items-center justify-center">
      {tab}
    </div>
  );
};
