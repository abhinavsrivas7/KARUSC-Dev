import Marquee from "react-fast-marquee";

interface BannerData {
    title: string
}

export const Banner = ({ title }: BannerData) => {
    return <>
        <div className="purple d-flex justify-content-center align-items-center regular-font"
            style={{
            top: "0",
            left: "0",
            width: "100%",
            position: "fixed"
            }}>
            <Marquee>
                {title}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Marquee> 
        </div>
    </>;
}