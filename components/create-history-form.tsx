import { createHistorySchema } from "@/lib/validations/history";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { SurgeryType } from "@prisma/client";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import clsx from "clsx";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof createHistorySchema>;

const surgeryTypeOptions = [
  { id: SurgeryType.DEPOSIT, value: SurgeryType.DEPOSIT, name: "Deposito" },
  { id: SurgeryType.BAIL, value: SurgeryType.BAIL, name: "Prestamo" },
];

export function CreateHistoryForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(createHistorySchema) });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const response = await fetch("/api/history", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (response.ok) {
      // TODO: reload or do it in the client?
      router.refresh();
      return;
    }

    // Toast with error
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <div>
          <label htmlFor="name">Nombre de historia</label>
          <input
            id="name"
            className="my-0 mb-3 mt-2 h-10 w-full rounded-lg border border-slate-300 py-2.5 px-3 text-sm  hover:bg-slate-50 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isLoading}
            {...register("name")}
          />
          {errors?.name && (
            <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="doctor">Nombre del doctor</label>
          <input
            id="doctor"
            className="focus:ring-sky-5500 my-0 mb-3 mt-2 h-10 w-full rounded-lg border border-slate-300 py-2.5 px-3  text-sm hover:bg-slate-50 focus:border-neutral-300 focus:outline-none focus:ring-2  focus:ring-sky-500 focus:ring-offset-1"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isLoading}
            {...register("doctor")}
          />
          {errors?.doctor && (
            <p className="px-1 text-xs text-red-600">{errors.doctor.message}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="surgeryDate">Fecha de la cirugia</label>
            <input
              type="date"
              className="mt-2 box-border block w-full cursor-pointer rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-2 text-left shadow-sm hover:bg-slate-50 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:bg-none"
              onClick={(e) => e.currentTarget.showPicker()}
              {...register("surgeryDate")}
            ></input>
            {errors?.surgeryDate && (
              <p className="px-1 text-xs text-red-600">
                {errors.surgeryDate.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="surgeryType"
              render={({ field: { onChange, value } }) => (
                <Listbox
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                  }}
                >
                  <Listbox.Label>Tipo de cirugia</Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="focus:border-gray-500-500 relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm">
                      {value
                        ? surgeryTypeOptions.find((o) => o.value == value)?.name
                        : "Selecciona una opcion"}
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {surgeryTypeOptions.map((o) => (
                        <Listbox.Option
                          key={o.id}
                          value={o.value}
                          className={({ active }) =>
                            clsx(
                              active ? "bg-sky-500 text-white" : "text-black",
                              "relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                          }
                        >
                          {o.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              )}
            />
            {errors?.surgeryType && (
              <p className="px-1 text-xs text-red-600">
                {errors.surgeryType.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="notes">Notas</label>
          <textarea
            id="notes"
            className="focus:ring-sky-5500 h- my-0 mb-3 mt-2 block w-full resize-y rounded-lg border border-slate-300  py-2.5 px-3 text-sm hover:bg-slate-50 focus:border-neutral-300  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1"
            rows={8}
            disabled={isLoading}
            {...register("notes")}
          />
          {errors?.notes && (
            <p className="px-1 text-xs text-red-600">{errors.notes.message}</p>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <button className="text-md rounded-lg bg-sky-500 px-5 py-2.5 text-center font-medium  text-white  hover:ring-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-600">
            <div className="flex flex-row items-center">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Guardar
            </div>
          </button>
        </div>
      </div>
    </form>
  );
}
