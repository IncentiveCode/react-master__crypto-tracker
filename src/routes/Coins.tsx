import { Link } from "react-router-dom";
import { fetchCoins } from "../api";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
	max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
		display: flex;
		align-items: center;
		gap: 10px;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const CoinImg = styled.img`
	width: 35px;
	height: 35px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
	// using react query
	const { isLoading, data } = useQuery<ICoin[]>({ queryKey: ["allCoins"], queryFn: fetchCoins });
	
	/**
	// using fetch 
	const [coins, setCoins] = useState<ICoin[]>([]);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		(async () => {
			const res = await fetch("/data.json")
			const json = await res.json();
			setCoins(json);
			setLoading(false);
		})();
	}, [])
	 */

	return (
		<>
			<Container>
				<Header>
					<Title>코인</Title>
				</Header>
				{isLoading ? (
					<Loader>Loading...</Loader>
				) : (
					<CoinsList>
						{data ? 
							(
								data.map((coin) => (
									<Coin key={coin.id}>
										<Link 
											to={{
												pathname: `/${coin.id}`,
											}}
											state={{ 
												name: coin.name
											}}
										>
											<CoinImg
												src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
											/>
											{coin.name} &rarr;
										</Link>
									</Coin>
								))
							) : null
						}
					</CoinsList>
				)}
			</Container>
		</>
	);
}

export default Coins;