import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, updateBalance, customRooms, deleteRoom } = useStore();
  const [addingCoins, setAddingCoins] = React.useState(false);
  const [coinAmount, setCoinAmount] = React.useState(10);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const userRooms = customRooms.filter((room) => room.ownerId === currentUser.id);

  const handleAddCoins = () => {
    updateBalance(coinAmount);
    setAddingCoins(false);
    setCoinAmount(10);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex items-center space-x-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full border-4 border-white/20"
          />
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{currentUser.name}</h1>
            <p className="text-white/70">Balance: ${currentUser.balance}</p>
          </div>
        </div>

        {/* Add Coins Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Add Coins</h2>
          {addingCoins ? (
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={coinAmount}
                onChange={(e) => setCoinAmount(Number(e.target.value))}
                className="p-2 rounded-lg bg-white/10 text-white border border-white/20"
                min="1"
              />
              <button
                onClick={handleAddCoins}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setAddingCoins(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAddingCoins(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30"
            >
              <Plus className="w-5 h-5" />
              Add Coins
            </button>
          )}
        </div>

        {/* Owned Rooms */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Your Rooms</h2>
            <button
              onClick={() => navigate('/create-room')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="w-5 h-5" />
              Create Room
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{room.title}</h3>
                  <button
                    onClick={() => deleteRoom(room.id)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-white/70 text-sm mb-2">{room.description}</p>
                <p className="text-white/70 text-sm">Entry Fee: ${room.entryFee}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}