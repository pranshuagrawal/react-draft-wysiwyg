/* @flow */

import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Dropdown, DropdownOption } from "../../../components/Dropdown";
import "./styles.css";

class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentState: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    defaultFontFamily: undefined,
  };

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName("DraftEditor-root");
    if (editorElm && editorElm.length > 0) {
      const editorStyles = window.getComputedStyle(editorElm[0]);
      const defaultFontFamily = editorStyles.getPropertyValue("font-family");
      this.setState({
        // eslint-disable-line react/no-did-mount-set-state
        defaultFontFamily,
      });
    }
  }

  render() {
    const { defaultFontFamily } = this.state;
    const {
      config: { className, dropdownClassName, options, title },
      translations,
      onChange,
      expanded,
      doCollapse,
      onExpandEvent,
      doExpand,
    } = this.props;
    let {
      currentState: { fontFamily: currentFontFamily },
    } = this.props;

    currentFontFamily =
      currentFontFamily ||
      (options &&
        defaultFontFamily &&
        options.some(
          (opt) => opt.value.toLowerCase() === defaultFontFamily.toLowerCase()
        ) &&
        defaultFontFamily);

    const currentFontFamilyName = (
      (options || []).find((opt) => opt.value === currentFontFamily) || {}
    ).label;

    return (
      <div
        className="rdw-fontfamily-wrapper"
        aria-label="rdw-font-family-control"
      >
        <Dropdown
          className={classNames("rdw-fontfamily-dropdown", className)}
          optionWrapperClassName={classNames(
            "rdw-fontfamily-optionwrapper",
            dropdownClassName
          )}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={
            title || translations["components.controls.fontfamily.fontfamily"]
          }
        >
          <span className="rdw-fontfamily-placeholder">
            {currentFontFamilyName ||
              currentFontFamily ||
              translations["components.controls.fontfamily.fontfamily"]}
          </span>
          {options.map((family, index) => (
            <DropdownOption
              active={currentFontFamily === family.value}
              value={family.value}
              key={index}
            >
              {family.label}
            </DropdownOption>
          ))}
        </Dropdown>
      </div>
    );
  }
}

export default LayoutComponent;
