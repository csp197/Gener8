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
