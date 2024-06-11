import ProfileAvatar from "./header/avatar";
import { ModeToggle } from "./ui/toggle-theme";

export default function Header() {
  return (
    <nav className="flex justify-between items-center px-4 py-2 border-b ">
      <div>Header</div>
      <div className="flex items-center space-x-5">
        <ModeToggle />
        <ProfileAvatar />
      </div>
    </nav>
  );
}
