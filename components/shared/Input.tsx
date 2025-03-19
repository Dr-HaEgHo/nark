"use client";
import { emailInputPropsFade } from "@/types";
import React, { FC } from "react";

const Input: FC<emailInputPropsFade> = (props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.setValue) return;
    props?.setValue(e.target.value);
  };

  return (
    <div
      className={`${props.inputWrapperClass} relative z-[9999] flex h-fit w-full items-center`}
    >
      {props.label && (
        <label htmlFor="" className="text-base font-medium">
          {props.label}
        </label>
      )}
      <input
        onChange={handleChange}
        value={props?.value}
        className={`${props.inputClass} z-0 h-11 flex min-w-[260px] py-[10px] pl-[38px] text-[14px] font-normal`}
        type="text"
        placeholder={props.placeholder && props.placeholder}
      />
      {props.icon && (
        <div
          className={`${props.iconWrapperClass} absolute right-6 top-1/2 z-50 -translate-y-1/2 transform`}
        >
          {props.icon}
        </div>
      )}
    </div>
  );
};

export default Input;

export const LineInput: FC<emailInputPropsFade> = (props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.setValue) return;
    props?.setValue(e.target.value);
  };

  return (
    <div
      className={`${props.inputWrapperClass} relative z-[9999] flex flex-col h-fit w-full items-start`}
    >
      {props.label && (
        <label htmlFor="" className="text-base font-medium">
          {props.label}
        </label>
      )}

      <div className="w-full relative">
        {props.iconStart && (
          <div
            className={`${props.iconWrapperClass} absolute left-[10px] top-1/2 z-50 -translate-y-1/2 transform`}
          >
            {props.iconStart}
          </div>
        )}

        <input
          onChange={handleChange}
          value={props?.value}
          className={`${props.inputClass} z-0 h-11 flex min-w-[260px] py-[10px] pl-[38px] text-[14px] font-normal`}
          type="text"
          placeholder={props.placeholder && props.placeholder}
        />

        {props.icon && (
          <div
            className={`${props.iconWrapperClass} absolute right-[10px] top-1/2 z-50 -translate-y-1/2 transform`}
          >
            {props.icon}
          </div>
        )}
      </div>
    </div>
  );
};
