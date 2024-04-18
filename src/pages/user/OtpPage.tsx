

const OtpPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div
        className="modal-content bg-gray-900 text-white p-8 rounded-lg"
        style={{ width: "450px" }}
      >
        <div className="flex justify-center p-4">
          <h2 className="text-3xl font-bold mb-4">Enter OTP</h2>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Enter OTP:rewrfewrf</label>
          <input
            type="text"
            name="otp"
            className="px-4 py-2 w-full rounded"
          />
        </div>

        <div className="flex">
          <button className="flex-1 bg-blue-700 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-full">
            Submit
          </button>
        </div>
        <br />
        <div className="mt-3 flex justify-center">
          <p>
            Resend OTP{" "}
            <span className="text-blue-500 cursor-pointer">Resend</span>{" "}
            |{" "}
            <span className="text-blue-500 cursor-pointer">Change Email</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
