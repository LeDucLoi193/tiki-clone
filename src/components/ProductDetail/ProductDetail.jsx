import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useHistory, useParams } from 'react-router-dom'

import './ProductDetail.scss'
import productAPI from '../../api/productAPI';
import Rating from '@material-ui/lab/Rating';
import ModifyCount from '../common/ModifyCount';
import { Button, Container } from '@material-ui/core';
import { containerStyle, buttonStyle } from '../../styles/customStyle';
import clsx from 'clsx';
import { useCart } from '../../contexts/Cart';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ProductDetail(props) {
	const [openFeedback, setOpenFeedback] = useState(false);
	const [product, setProduct] = useState();
	const { handleCart } = useCart();
	const { id } = useParams();
	const history = useHistory();

	const buttonStyles = buttonStyle();
	const containerStyles = containerStyle();
	const containerClassName = clsx(containerStyles.productDetailContainer);
	const buttonClassName = clsx(buttonStyles.selectToBuyButton);
	const seeCartButtonClassName = clsx(buttonStyles.seeCart);
	
	useEffect(() => {
		const getProduct = async () => {
			const productResponse = await productAPI.getProductWithId(id);
			setProduct({
				...productResponse[0],
				count: 1,
			});
		}

		getProduct();
	}, [id]);
	
	const handleDecreaseCount = () => {
		setProduct({
			...product,
			count: product.count - 1,
		});
	}

	const handleIncreaseCount = () => {
		setProduct({
			...product,
			count: product.count + 1,
		});
	}

	const handleAddToCart = () => {
		setOpenFeedback(true);
		handleCart(product);
	}

	const handleCloseFeedback = (event, reason) => {
		if (reason === 'clickaway') {
      return;
    }

		setOpenFeedback(false);
	}

	const handleSeeCart = () => {
		history.push('/cart');
	}

	return (
		<Container className={containerClassName}>
			<div className="detail__left">
				<img src={product?.image} alt={product?.name} />
				<div className="detail__left__images">
					<img src={product?.image} alt={product?.name} />
					<img src={product?.image} alt={product?.name} />
					<img src={product?.image} alt={product?.name} />
					<img src={product?.image} alt={product?.name} />
				</div>
			</div>

			<div className="detail__right">
				<p className="detail__right__name">{product?.name}</p>
				{
					product?.rating ? 
					<Rating 
						name="read-only" 
						value={product.rating} 
						readOnly
					/>
					:
					<p className="detail__right__evaluate">S???n ph???m ch??a c?? ????nh gi?? n??o</p>
				}
				<p className="detail__right__price">{product?.price}</p>
				<p className="detail__right__more-info">
					<span>B???n h??y</span> 
					<a href="#">NH???P ?????A CH???</a>
					<span>nh???n h??ng ????? ???????c d??? b??o th???i gian v?? chi ph?? giao h??ng m???t c??ch ch??nh x??c nh???t.</span>	
				</p>
				<ModifyCount
					product={product}
					onDecreaseModifyCount={handleDecreaseCount}
					onIncreaseModifyCount={handleIncreaseCount}
				/>
				<Button 
					className={buttonClassName} 
					variant="contained"
					onClick={handleAddToCart}
				>
					Ch???n mua
				</Button>
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "right"}}
					open={openFeedback} 
					onClose={handleCloseFeedback}
				>
					<Alert onClose={handleCloseFeedback} severity="success">
						Th??m v??o gi??? h??ng th??nh c??ng.
						<Button 
							variant="contained" 
							className={seeCartButtonClassName}
							onClick={handleSeeCart}
						>
							Xem gi??? h??ng v?? thanh to??n
						</Button>
					</Alert>
				</Snackbar>
			</div>
		</Container>
	)
}

ProductDetail.propTypes = {

}

export default ProductDetail

