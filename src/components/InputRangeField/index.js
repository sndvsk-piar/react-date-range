import React, { Component } from 'react';
import PropTypes from 'prop-types';

const MIN = 0;
const MAX = 99999;

class InputRangeField extends Component {
  constructor(props, context) {
    super(props, context);
    this.inputRef = React.createRef();
    this.state = {
      inputValue: props.value !== undefined ? props.value.toString() : '',
    };
  }

  shouldComponentUpdate(nextProps) {
    const { value, label, placeholder } = this.props;

    return (
      value !== nextProps.value ||
      label !== nextProps.label ||
      placeholder !== nextProps.placeholder
    );
  }

  onChange = e => {
    const { onChange } = this.props;
    let valueStr = e.target.value;

    if (valueStr === '') {
      this.setState({ inputValue: '' });
      onChange('');
      return;
    }

    if (/^\d+$/.test(valueStr)) {
      let valueInt = parseInt(valueStr, 10);
      valueInt = isNaN(valueInt) ? 0 : Math.max(Math.min(MAX, valueInt), MIN);

      if (valueInt >= MIN && valueInt <= MAX) {
        onChange(valueInt);
      }
    }

    this.setState({ inputValue: valueStr });
  };

  handleFocus = e => {
    this.inputRef.current.select();
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  render() {
    const { label, placeholder, styles, onBlur, onFocus } = this.props;

    const inputValue = this.state?.inputValue || '';

    return (
      <div className={styles.inputRange}>
        <input
          ref={this.inputRef}
          type="text"
          className={styles.inputRangeInput}
          placeholder={placeholder}
          value={inputValue}
          onChange={this.onChange}
          onFocus={e => {
            onFocus && onFocus(e);
            this.handleFocus(e);
          }}
          onBlur={onBlur}
        />
        <span className={styles.inputRangeLabel}>{label}</span>
      </div>
    );
  }
}

InputRangeField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  placeholder: PropTypes.string,
  styles: PropTypes.shape({
    inputRange: PropTypes.string,
    inputRangeInput: PropTypes.string,
    inputRangeLabel: PropTypes.string,
  }).isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputRangeField.defaultProps = {
  value: '',
  placeholder: '',
};

export default InputRangeField;
