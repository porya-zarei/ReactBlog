import { useRecoilState } from 'recoil';
import { statisticsData } from '../../recoil/atoms/statistics';


const DayVisitSite = () => {

    const [statis] = useRecoilState(statisticsData);

    return ( 
        <div className="card text-white bg-indigo my-2">

            <img id="site-admin" className="card-img card-img-top" width="100%" height="200" src="../images/Illu/site-stats-bro-sec.svg" alt="site-status" />
            <div className="card-body">
                <h4 className="card-title">بازدید امروز</h4>
                <p className="card-text">
                    <div className="bi bi-eye-fill"><span className="mx-1">{statis.DayVisits}</span></div>
                </p>
            </div>

        </div>
     );
}
 
export default DayVisitSite;