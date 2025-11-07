import { useQuery } from "@tanstack/react-query";
import { fetchPriceInfo } from "../api";
import styled from "styled-components";


interface PriceProps {
	open: string;
	close: string;
	high: string;
	low: string;
}

const ItemRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
`;

const ItemDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  border-radius: 10px;
	width: 100%;

	span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

function Price({ open, close, high, low }: PriceProps) {	

	return (
		<div>
			<ItemRow>
				<ItemDiv>
					<span>open</span>
					<span>{open}</span>
				</ItemDiv>
				<ItemDiv>
					<span>close</span>
					<span>{close}</span>
				</ItemDiv>
				<ItemDiv>
					<span>high</span>
					<span>{high}</span>
				</ItemDiv>
				<ItemDiv>
					<span>low</span>
					<span>{low}</span>
				</ItemDiv>
			</ItemRow>
		</div>
	);
}

export default Price;