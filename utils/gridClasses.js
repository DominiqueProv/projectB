import { useBabies } from '../context/BabiesContext';

const useGridClasses = () => {
    const { babiesDataList } = useBabies();

    if (!babiesDataList || babiesDataList.length === 0) {
        return 'grid-cols-1 w-[35vw] md:w-[20vw] lg:w-[10vw]';
    } else if (babiesDataList.length > 0 && babiesDataList.length <= 3) {
        return `grid-cols-${babiesDataList.length + 1} mx-3 lg:mx-0`;
    } else {
        const rows = Math.ceil(babiesDataList.length / 3);
        return `grid-cols-3 grid-rows-${rows} mx-3 lg:mx-0`;
    }
};

export default useGridClasses;
