import { auth } from "@/auth";

export default async function UserPage() {
  const session = await auth();
  if (!session?.user)
    return (
      <div className="flex flex-col items-center justify-center">No user</div>
    );
  return (
    <div className="flex flex-col items-center justify-center ">
      Welcome, {session.user.name}!
    </div>
  );
}
