import { useRouter } from "next/router";
import { auth, db } from "../utils/firebase";
import "react-toastify/dist/ReactToastify.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";

const CalenderWrap = () => {
  const router = useRouter();
  const [showConfirmSignout, setShowConfirmSignout] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <div className="pt-0">
      {showConfirmSignout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white rounded-lg p-4 z-50 mx-4 md:mx-0">
            <p className="mb-4">Are you sure you want to signout</p>
            <div className="flex justify-end">
              <button className="text-white bg-red-500 py-2 px-4 rounded-lg mr-2" onClick={handleSignoutAccount}>
                Signout
              </button>
              <button className="text-gray-600 bg-gray-300 py-2 px-4 rounded-lg" onClick={() => setShowConfirmSignout(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>        
      )}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white rounded-lg p-4 z-50 mx-4 md:mx-0">
            <p className="mb-4">Are you sure you want to terminate your account? This action is irreversible.</p>
            <div className="flex justify-end">
              <button className="text-white bg-red-500 py-2 px-4 rounded-lg mr-2" onClick={handleTerminateAccount}>
                Yes, terminate my account
              </button>
              <button className="text-gray-600 bg-gray-300 py-2 px-4 rounded-lg" onClick={() => setShowConfirmDelete(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}      

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm my-4">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-lg font-semibold leading-none tracking-tight">Sign Out Account</h3>
          <p className="text-sm text-muted-foreground">Disconnect from your account and return to the login screen.</p>
        </div>
        <div className="flex items-center p-6 pt-0">
          <button className="inline-flex text-white items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-black text-primary-foreground h-10 py-2 px-4" onClick={() => setShowConfirmSignout(true)}>
            Sign out
          </button>
        </div>
      </div>



    </div>
  );
};

export default CalenderWrap;