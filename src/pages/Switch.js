export default function Switch({ value, onChangeFunc }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer ">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={value}
                onChange={onChangeFunc}
            />
            <div className="w-14 h-7 bg-gray-300 peer-checked:bg-green-500 rounded-full transition-all p-1 border-b-none">
                <div
                    className={`w-6 h-5 bg-white rounded-full shadow-md transition-transform transform ${value ? "translate-x-6" : "translate-x-1"
                        }`}
                ></div>
            </div>
        </label>
    );
}
