import {GetStaticProps, GetStaticPaths} from 'next';

export default function BasketBallGame() {

}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {}
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    };
};