import { signOut } from "@/auth";

const SignoutButton = () => {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default SignoutButton;
