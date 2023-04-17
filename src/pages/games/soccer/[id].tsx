import {GetStaticProps, GetStaticPaths} from 'next';

export default function SoccerGame() {

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