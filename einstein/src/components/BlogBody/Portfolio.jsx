import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';
const Portfolio = () => {
    return (
        <>
            <div className="container mt-5 bg-dark bg-gradient">
                <div className="row">
                    <div className="col-12 mb-3">
                        <div className="p-1 card border-0 bg-transparent">
                            <div className="card-header">
                                <div className="row gr-oceanblue p-2 rounded-2">
                                    <div className="col-4">
                                        <img
                                            className="img-rounded"
                                            height="90"
                                            src="./images/avatar.jpg"
                                            alt="avatar"
                                        />
                                    </div>
                                    <p className="col-8 text-clip1 text-center font-mini-1 m-auto">
                                        {" "}
                                        Porya Zarei Electrical Engineer , Web &
                                        Machine Learning Developer{" "}
                                    </p>
                                </div>
                            </div>
                            <div className="card-body portfolio-bgimage row justify-content-center align-items-center rounded-2 px-2 py-4">
                                <Fade top cascade delay={200}>
                                    <p className="col-12 card-text text-white rounded-2 glass-effect-dark z-10-hover center text-center p-2">
                                        <ul className="ul-decoration-none">
                                            <li>
                                                {" "}
                                                من{" "}
                                                <strong> پوریا زارعی </strong>
                                                دانشجوی مهندسی برق
                                                <a
                                                    className="card-link link-info text-decoration-none"
                                                    href="http://www.iust.ac.ir/"
                                                    target="_blank"
                                                    rel="noreferrer">
                                                    {" "}
                                                    دانشگاه علم و صنعت ایران
                                                </a>{" "}
                                                هستم
                                            </li>
                                            <li className="pt-2">
                                                مهارت ها :
                                                <ul className="ul-decoration-none pr-3 pt-2 my-skills text-decoration-none">
                                                    <li>
                                                        <b>C#</b> ( Asp .net
                                                        Core ,WF )
                                                    </li>
                                                    <li>
                                                        <b>Javascript</b> (
                                                        ECMA(6,7) , React ,
                                                        Jquery )
                                                    </li>
                                                    <li>
                                                        <b>
                                                            Python + Machine
                                                            Learning
                                                        </b>
                                                    </li>
                                                    <li>
                                                        <b>
                                                            {" "}
                                                            HTML5, CSS3,
                                                            Bootstrap{" "}
                                                        </b>
                                                    </li>
                                                    <li>
                                                        <b>Figma</b>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                در این وب سایت تجربیات خودم و
                                                مطالب مرتبط با تکنولوژی و برنامه
                                                نویسی رو به اشتراک می گذارم .
                                            </li>
                                        </ul>
                                    </p>
                                </Fade>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 container-fluid px-3">
                        <div className="row">
                            <div className="col-12 container-fluid mb-2">
                                <div className="row gap-1 justify-content-evenly align-items-baseline">
                                    <div className="col-md-5 col-lg-5 col-xs-12 col-sm-12 p-0">
                                        <Flip right delay={700}>
                                            <div className="card">
                                                <div className="card-header">
                                                    <img
                                                        src="./images/project/shop.jpg"
                                                        className="card-img-top h-300px"
                                                        alt="Figma Project"
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <div className="card-title alert-dark p-2 rounded-2">
                                                        نمونه کار وب سایت
                                                        فروشگاهی با Asp .net
                                                        Core
                                                    </div>
                                                </div>
                                            </div>
                                        </Flip>
                                    </div>
                                    <div className="col-md-5 col-lg-5 col-xs-12 col-sm-12 p-0">
                                        <Flip left delay={700}>
                                            <div className="card">
                                                <div className="card-header">
                                                    <img
                                                        src="./images/project/blog.jpg"
                                                        className="card-img-top h-300px"
                                                        alt="Figma Project"
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <div className="card-title alert-dark p-2 rounded-2">
                                                        نمونه کار وبلاگ با React
                                                        & Asp .net Core API
                                                    </div>
                                                </div>
                                            </div>
                                        </Flip>
                                    </div>
                                    <div className="col-md-5 col-lg-5 col-xs-12 col-sm-12 p-0">
                                        <Flip bottom delay={700}>
                                            <div className="card">
                                                <div className="card-header">
                                                    <img
                                                        src="./images/project/figma1.png"
                                                        className="card-img-top h-300px"
                                                        alt="Figma Project"
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <div className="card-title alert-dark p-2 rounded-2">
                                                        نمونه کار Figma
                                                    </div>
                                                </div>
                                            </div>
                                        </Flip>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 m-auto my-1">
                                <div
                                    class="badge-base LI-profile-badge"
                                    data-locale="en_US"
                                    data-size="medium"
                                    data-theme="dark"
                                    data-type="VERTICAL"
                                    data-vanity="porya-zarei-1a1129197"
                                    data-version="v1">
                                    <a
                                        class="badge-base__link LI-simple-link"
                                        href="https://ir.linkedin.com/in/porya-zarei-1a1129197?trk=profile-badge">
                                        Porya Zarei
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 m-auto mb-1">
                                <div className="card bg-secondary p-0 m-0 border-0">
                                    <div className="card-header bg-warning bg-gradient card-title">
                                        اطلاعات من
                                    </div>
                                    <div className="card-body text-white">
                                        <dl>
                                            <dt>ایمیل : </dt>
                                            <dd>
                                                <a
                                                    className="text-info text-decoration-none"
                                                    href="mailto:Pzeinstein@gmail.com">
                                                    <b>Pzeinstein@gmail.com</b>
                                                </a>
                                            </dd>
                                            <dt>تلگرام : </dt>
                                            <dd>
                                                <a
                                                    className="text-info text-decoration-none"
                                                    href="https://t.me/Pzeinstein"
                                                    target="_blank"
                                                    rel="noreferrer">
                                                    <b>@Pzeinstein</b>
                                                </a>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div className="card-footer bg-warning bg-gradient">
                                        <a
                                            href="#contact-me"
                                            className="btn btn-indigo bg-gradient btn-block">
                                            ارسال ایمیل
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12"></div>
                </div>
            </div>
        </>
    );
}

export default Portfolio;