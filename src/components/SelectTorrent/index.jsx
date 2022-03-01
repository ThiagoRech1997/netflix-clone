import React from "react";
import Select from "react-select";

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted pink",
        color: "black",
    }),
  
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
  
        return { ...provided, opacity, transition };
    },
};

export default class SelectTorrent extends React.Component {
    state = {
        selectedOption: undefined,
    };
  
    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
    };
  
    render() {
        const { selectedOption } = this.state;
        const { torrents } = this.props;

        const options = torrents.map((item) => ({
            label: item.title,
            value: item.link,
        }));
        return (
            <div>
            {console.log(options)}
            <Select
                styles={customStyles}
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            /></div>
        );
    }
    }