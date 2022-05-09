import { UserCircleIcon } from "@heroicons/react/solid";

export default function UserInfoHeader() {
  const role = localStorage.getItem("userRole");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  

  //console.log("bizarre", lastName);

  return (
    <div class="header-content flex items-center flex-row">
      <div class="flex ml-auto">
        <a href class="flex flex-row items-center">
          <UserCircleIcon
            className="w-8 h-8 text-indigo-600"
            aria-hidden="true"
          />
          <span class="flex flex-col ml-2">
            <span class="font-semibold tracking-wide leading-none">
              {firstName + " " + lastName}
            </span>
            <span class="text-gray-500 text-xs leading-none mt-1">
              {role == "Employe" ? "Employé" : "Administrateur"}
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}
