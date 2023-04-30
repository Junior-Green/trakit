import {GetStaticProps, GetStaticPaths} from 'next';

export default function BaseBallGame() {

}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            id : "hello"
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    };
};