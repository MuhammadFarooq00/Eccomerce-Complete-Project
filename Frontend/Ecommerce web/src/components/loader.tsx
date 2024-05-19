import "../style/adminstles/app.scss";

const Loader = () => {
  return (
    <>
    <section id="loadingloader">
         <div className="Loading">
         </div>
    </section>
    </>)
}

export default Loader;


export const SkeletonLoader = () => {
  return (
    <>
         <div className="skeleton-loader">
          <div className="skeleton-shape"></div>
          <div className="skeleton-shape"></div>
          <div className="skeleton-shape"></div>
         </div>
    </>)
}



