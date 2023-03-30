import React from "react";
import "./HomePage.scss";
import { PasswordGenerator } from '../../components/PasswordGeneratorComponent/PasswordGeneratorComponent'

export const HomePage: React.FC = () => {

  return (
    <div className="homepage">
      <PasswordGenerator />
    </div>
  );
};
