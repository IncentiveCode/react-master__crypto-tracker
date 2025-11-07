import { Link, Route, Routes, useLocation, useParams, useMatch } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchPriceInfo } from "../api";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";


const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackBtn = styled.div`
	background-color: ${(p) => p.theme.bgColor};
	color: ${(p) => p.theme.accentColor};
	font-size: 20px;
	width: 40px;
	height: 40px;
	border-radius: 20px;
	border: 1px solid;
	border-color: ${(p) => p.theme.bgColor};

	a {
		display: flex;
		align-items: center;
		padding: 10px;
	}

	&:hover {
		background-color: rgba(0, 0, 0, 0.3);
	}
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const EmptyArea = styled.div`
	width: 40px;
	height: 40px;
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
	width: 33%;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  a {
		padding: 7px 0px;
    display: block;
  }
`;

interface IRouteState {
  name: string;
}

interface ICoinData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
	close: string;
	high: string; 
	low: string;
	market_cap: number;
	open: string;
	time_close: number; 
	time_open: number; 
	volume: string; 
}

function Coin() {
	const { coinId } = useParams();

	const location = useLocation();
	const state = location.state as IRouteState;
	
	const chartMatch = useMatch("/:coinId/chart");
	const priceMatch = useMatch("/:coinId/price");
	
	/**
	// using fetch
	const [loading, setLoading] = useState(true);
	const [coinInfo, setCoinInfo] = useState<ICoinData>();
	const [priceInfo, setPriceInfo] = useState<IPriceData[]>();
	useEffect(() => {
		(async () => {
			const infoData = await (
				await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
			).json();
			const priceData = await (
				await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
			).json();

			setCoinInfo(infoData);
			setPriceInfo(priceData);
			setLoading(false);
		})();
	}, [coinId]);
	 */

	// using react query
	const { isLoading: infoLoaindg, data: infoData } = useQuery<ICoinData>(
		{ queryKey: ["info", coinId], queryFn: () => fetchCoinInfo(coinId ?? "") }
	);
	const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData[]>(
		{ queryKey: ["price", coinId], queryFn: () => fetchPriceInfo(coinId ?? ""), refetchInterval: 10000 }
	);
	const loading = infoLoaindg || priceLoading;

	return (
		<Container>
			<Header>
				<BackBtn>
					<Link to="/">&larr;</Link>
				</BackBtn>
				<Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
				<EmptyArea />
			</Header>
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Volume</span>
              <span>{priceData ? parseFloat(priceData[priceData.length - 1].volume).toFixed(2) : ""}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Market Cap</span>
              <span>{priceData ? priceData[priceData.length - 1].market_cap : ""}</span>
            </OverviewItem>
          </Overview>

					<Tabs>
						<Tab $isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab $isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>Price</Link>
						</Tab>
					</Tabs>

          <Routes>
            <Route path={`/chart`} element={<Chart coinId={coinId!}/>} />
            <Route path={`/price`} 
							element={<Price 
								open={priceData ? priceData[priceData?.length - 1].open : ""} 
								close={priceData ? priceData[priceData?.length - 1].close : ""} 
								high={priceData ? priceData[priceData?.length - 1].high : ""} 
								low={priceData ? priceData[priceData?.length - 1].low : ""} 
							/>} 
						/>
          </Routes>
        </>
			)}
		</Container>
	);
}

export default Coin;