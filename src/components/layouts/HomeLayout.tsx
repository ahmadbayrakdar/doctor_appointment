type LayoutProps = {
    children: React.ReactNode;
};
const HomeLayout = ({children}: LayoutProps): JSX.Element => {

    return (
        <div>{children}</div>
    );
};

export default HomeLayout;
