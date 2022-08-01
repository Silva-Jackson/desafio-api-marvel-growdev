import styled from "styled-components";

type ThumbnailData = {
    thumbnail: {
        path: string;
        extension: string;
    };
};

export const Cabecalho = styled.header`
    display: flex;    
    align-items: center;
    justify-content: space-between;
    font-size: 2rem;
    font-weight: bold;
    background: #db1117;
    color: #f1f1f1;
    width: 100vw;
    padding: 0 24px;
    margin-bottom: 8px;
    gap: 24px;
    position: fixed;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
`;

export const Container = styled.main`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: #00000096;
`;

export const CardList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 80px;
`;

const urlImg = (props: ThumbnailData) =>
    `${props.thumbnail.path}.${props.thumbnail.extension}`;

export const Card = styled.div`
    background: #f1f1f1;
    height: 440px;
    width: 300px;
    margin: 10px;
    padding: 0;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.3);

    h2,
    p {
        padding: 5px;
        text-align: justify;
    }

    div#img {
        height: 400px;
        width: 100%;
        background: url(${urlImg}) no-repeat center;
        background-size: cover;

        transition: all 1s;
    }

    &:hover {
        div#img {
            height: 100px;
        }
    }
`;

export const ButtonMore = styled.div`
    background: #f1f1f1;
    height: 48px;
    width: 456px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.3);
    margin: 20px auto;
    padding: 0 50px;
    border-radius: 5px;
    transition: all 0.3s;

    &:hover {
        background: #db1117;
    }
`;

export const Link = styled.a`
    text-decoration: none;
    color: black;
`;
