import './index.css';
const Avatar = ({ onClick }) => {
  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      onClick={onClick}
    >
      <img
        src="https://api.dicebear.com/9.x/bottts/svg?seed=ERPBot"
        alt="AI Assistant"
        className="w-16 h-16 rounded-full shadow-xl cursor-pointer hover:scale-110 transition-transform duration-300"
      />
    </div>
  );
};

export default Avatar;