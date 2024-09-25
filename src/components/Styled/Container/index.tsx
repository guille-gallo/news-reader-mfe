// Container/index.js
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 80vh;
    min-height: 80vh;
    width: 800px;
    overflow-y: scroll;
    margin: 0 auto;
    padding: 0px 0px 0px 200px;

    @media (max-width: 1200px) {
        width: 700px;
    }

    @media (max-width: 992px) {
        width: 600px;
        padding: 0px 0px 0px 100px; // adjust padding if necessary
    }

    @media (max-width: 768px) {
        width: 100%; // Full width on smaller screens
        padding: 0px; // Adjust padding for small screens if needed
    }

    @media (max-width: 576px) {
        width: 100%;
        padding: 0px;
    }

`;

export default Container;