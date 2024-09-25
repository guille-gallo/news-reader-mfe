import styled from 'styled-components';

const Header = styled.div`
    //width: 100vw;
    height: 100px;
    background-color: rgba(255 102 0 / 100%);

    .content {
        font-size: 64px;
        font-weight: bold;
        padding: 29px 0px 0px 0px;
        color: #fff;
        max-width: 520px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    /* For tablets and small desktops */
    @media screen and (max-width: 1024px) {
        .content {
            font-size: 48px;
        }
    }

    /* For mobile devices */
    @media screen and (max-width: 600px) {
        .content {
            font-size: 32px;
        }
    }
`;

export default Header;
