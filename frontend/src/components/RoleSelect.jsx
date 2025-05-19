import { Listbox } from "@headlessui/react";

const roles = [
    { name: "🧝 Usuario", value: "usuario" },
    { name: "🧙 Moderador", value: "moderador" },
    { name: "👑 Admin", value: "admin" },
];

export default function RoleSelect({ value, onChange }) {
    const selected = roles.find((r) => r.value === value);

    return (
        <div className="relative">
            <Listbox value={selected} onChange={(role) => onChange(role.value)}>
                <Listbox.Button className="w-full bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-pink-400">
                    {selected.name}
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-full bg-gradient-to-br from-purple-800/90 via-pink-800/90 to-indigo-800/90 border border-white/30 rounded-xl shadow-xl text-white z-50 backdrop-blur-sm">
                    {roles.map((role) => (
                        <Listbox.Option
                            key={role.value}
                            value={role}
                            className={({ active }) =>
                                `px-4 py-2 cursor-pointer ${active ? "bg-pink-500/30" : ""
                                }`
                            }
                        >
                            {role.name}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
}
