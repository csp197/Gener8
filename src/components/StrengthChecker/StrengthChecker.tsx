import zxcvbn from "zxcvbn";

interface IStrengthCheckerProps {
  passwordState: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createPasswordLabel = (strength: any) => {
  switch (strength.score) {
    case 0:
      return "Weak :("; // incorporate emojis pls :)
    case 1:
      return "Weak";
    case 2:
      return "Fair";
    case 3:
      return "Good";
    case 4:
      return "Strong";
    default:
      return "Weak";
  }
};

const StrengthChecker = (props: IStrengthCheckerProps) => {
  const strength = zxcvbn(props.passwordState);
  return <>{createPasswordLabel(strength)}</>;
};

export default StrengthChecker;

/**
 * 
import React, { Component } from 'react';
import zxcvbn from 'zxcvbn';
import './PasswordStrengthMeter.css';

class PasswordStrengthMeter extends Component {

    createPasswordLabel = (result) => {
        switch (result.score) {
            case 0:
                return 'Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';           
            default:
                return 'Weak';
        }
    }

    render() {
        const { password } = this.props;
        const testedResult = zxcvbn(password)
        return (
            <div className="password-strength-meter">
                <progress 
                    className = {`password-strength-meter-progress password-strength-meter-progress-${this.createPasswordLabel(testedResult)}`}
                    value={testedResult.score} 
                    max="4"/>
                <br />
                <label className="password-strength-meter-label">
                    {password && (
                        <>
                        <strong>Password Strength: </strong> {this.createPasswordLabel(testedResult)}
                        </>
                    )}
                </label>
            </div>
        );
    }
}

export default PasswordStrengthMeter
 
 */
