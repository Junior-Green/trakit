import {useSession} from 'next-auth/react';
import Select, {StylesConfig} from 'react-select';
import chroma from 'chroma-js';
import {Dispatch, SetStateAction} from 'react';

const sportsOptions = [
    {value: 'soccer', label: 'Soccer'},
    {value: 'basketball', label: 'Basketball'},
    {value: 'hockey', label: 'Hockey'},
    {value: 'football', label: 'Football'}
] as const;

type SportsOption = {
    label: string;
    value: "soccer" | "basketball" | "hockey" | "football";
};

const backgroundColor = chroma("#202344");

const colourStyles: StylesConfig<SportsOption> = {
    control: (styles) => (
        {
            ...styles,
            backgroundColor: backgroundColor.css(),
            border: 0,
            boxShadow: 'none'
        }
    ),
    option: (styles, {data, isDisabled, isFocused, isSelected}) => (
        {
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                    ? backgroundColor.css()
                    : isFocused
                        ? backgroundColor.alpha(0.1).css()
                        : undefined,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? chroma.contrast(backgroundColor, 'white') > 2
                        ? 'white'
                        : 'black'
                    : backgroundColor.css(),
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? backgroundColor.css()
                        : backgroundColor.alpha(0.3).css()
                    : undefined,
            },

        }),
    input: (styles) => ({...styles}),
    placeholder: (styles) => ({...styles, color: "white"}),
    singleValue: (styles) => ({...styles, color: "white"}),
};

interface SelectSportDropdownType {
    defaultSport: "soccer" | "basketball" | "hockey" | "football" | undefined | null,
    setSport: Dispatch<SetStateAction<"basketball" | "football" | "soccer" | "hockey" | null | undefined>>;
}

export const SelectSportDropdown = ({defaultSport, setSport}: SelectSportDropdownType) =>
    <Select
        defaultValue={sportsOptions.find((val) => val.value === defaultSport)}
        options={sportsOptions}
        styles={colourStyles}
        closeMenuOnScroll={true}
        closeMenuOnSelect={true}
        isClearable={false}
        isMulti={false}
        isSearchable={false}
        menuPlacement='bottom'
        placeholder="Choose sport"
        onChange={(option) => option?.value && setSport(option.value)}
    />;
