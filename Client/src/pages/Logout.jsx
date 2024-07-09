import React, { useContext, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Logout = () => {
    const [openModal, setOpenModal] = useState(false);
    const { logOut } = useContext(AuthContext);

    const handleSignOut = () => {
        logOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.error('Error during sign out:', error);
        });
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <Button onClick={() => setOpenModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Click here to Logout
            </Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Confirm Logout</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Are you sure you want to log out? Please confirm if you wish to end your session.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link to="/" onClick={handleSignOut}>
                        <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setOpenModal(false)}>
                            Yes, I want to sign out!
                        </Button>
                    </Link>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Logout;
