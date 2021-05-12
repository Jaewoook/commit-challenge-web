import React from "react";
import styled from "@emotion/styled";

const LayoutWarpper = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const Layout: React.FC = ({ children }) => {
    return (
        <LayoutWarpper>
            {children}
        </LayoutWarpper>
    );
};
