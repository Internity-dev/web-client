import PropTypes from "prop-types";

const PresenceModal = ({ message, id }) => {
  return (
    <dialog id={id} className='modal'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>{message}</h3>
        <div className='modal-action'>
          <form method='dialog'>
            <button className='btn'>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

PresenceModal.propTypes = {
  message: PropTypes.string,
  id: PropTypes.string,
};

export default PresenceModal;
