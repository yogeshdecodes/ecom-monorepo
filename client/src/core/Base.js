import React from 'react';
import Menu from './Menu';

const Base = ({
  title = 'default title',
  description = 'defalt description',
  className = ' p-4',
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron   text-center">
          <h2>{title}</h2>
          <p>{description}</p>
          <div className={className}>{children}</div>
        </div>
      </div>
      <footer>
      <div class="bottom section-padding">
			<div class="container">
				<div class="row">
					<div class="col-md-12 text-center">
						<div class="copyright ">
							<p> Made with ❤️ by <a href="'https://twitter.com/yogeshdecodes" class="transition">Yogesh</a> </p>
						</div>
					</div>
				</div>
			</div>
		</div>
      </footer>
    </div>
  );
};

export default Base;
