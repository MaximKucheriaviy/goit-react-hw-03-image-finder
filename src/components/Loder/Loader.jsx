import { TailSpin } from "react-loader-spinner";
import { createPortal } from "react-dom";

const modalPortal = document.querySelector('#modal-root');

export const Loader = props => {
    return (createPortal(
    <div className="Overlay">
        <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>, modalPortal)
    )
}