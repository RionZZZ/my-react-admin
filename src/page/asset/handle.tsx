import { useAppDispatch, useAppSelector } from "@/store";
import { clearAsset } from "@/store/modules/asset";
import { AssetState } from "@/types/asset";
import { HandleTypeEnum } from "@/types/enums/type";
import { FC, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const AssetHandlePage: FC = () => {
  const { handle } = useParams();
  const location = useLocation();
  const { state } = location;
  const { assetInfo } = useAppSelector<AssetState>((state) => state.asset);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      handle === HandleTypeEnum.EDIT ||
      (handle == HandleTypeEnum.ADD &&
        assetInfo &&
        state.copyId &&
        assetInfo.id === state.copyId)
    ) {
      console.log(assetInfo);
    }

    return () => {
      dispatch(clearAsset());
    };
  }, [assetInfo, handle, state]);

  return <>page</>;
};

export default AssetHandlePage;
