import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import { RESET_DATA } from './actions';
import { fetchData, mapStateToProps, mapDispatchToProps} from './controller';
import CampaignMenu from './CampaignMenu';
import PromoSelectionMenu from './PromoSelectionMenu';
import PromoDetails from './PromoDetails';

const styles = require('./PromosCashbackRedeem.scss');

/**
 * Change from function to class, since function are no longer objects in javascript.
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class PromosCashbackRedeem extends Component {

  static propTypes = {
    companies: PropTypes.array,
    company: PropTypes.string,

    brandManagers: PropTypes.array,
    campaigns: PropTypes.array,
    brands: PropTypes.array,

    promos: PropTypes.array,

    currentEditingPromo: PropTypes.number,
    isPromoSectionShown: PropTypes.bool,

    brandManagerIdMap: PropTypes.object,
    brandManagerCampaignMap: PropTypes.object,
    brandManagerBrandMap: PropTypes.object,

    brandEmail: PropTypes.string,
    campaignName: PropTypes.string,
    budgetedAmount: PropTypes.oneOfType([
      PropTypes.number.isRequired,
      PropTypes.string.isRequired
    ]),
    fundsCredited: PropTypes.oneOfType([
      PropTypes.number.isRequired,
      PropTypes.string.isRequired
    ]),

    activeFrom: PropTypes.string.isRequired,
    activeTo: PropTypes.string.isRequired,

    campaignStatus: PropTypes.string.isRequired,

    onCompanyChange: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onBrandManagerChange: PropTypes.func.isRequired,

    onAddPromo: PropTypes.func.isRequired,
    onRemovePromo: PropTypes.func.isRequired,
    onEditPromo: PropTypes.func.isRequired,

    onChangePromoObjInfo: PropTypes.func.isRequired,
    onChangePromoInfo: PropTypes.func.isRequired,

    onSubmitData: PropTypes.func.isRequired,

    dispatch: PropTypes.func.isRequired
  }

  // TODO: I have too many route page component and really messed up.
  // Fix this onces the pageContainer and components are figured out.
  // NOTE: So, if the component is unmount then the new initial values are fetched.
  componentDidMount() {
    this.props.dispatch({type: RESET_DATA});
    this.props.dispatch(fetchData);
  }

  render() {
    // state variables.
    const {brandManagers, brandEmail, campaignName, budgetedAmount, fundsCredited, campaigns,
      currentEditingPromo, isPromoSectionShown, onRemovePromo, promos, activeFrom, activeTo,
      brands, campaignStatus, brandManagerCampaignMap, brandManagerBrandMap, companies,
      brandManagerIdMap} = this.props;

    // controllers.
    const {onValueChange, onBrandManagerChange, onAddPromo, onEditPromo, onSubmitData,
      onCompanyChange, onChangePromoObjInfo, onChangePromoInfo} = this.props;

    const brandManagerOptions = brandManagers.map((brandManager, index) => {
      return (
        <option key={index} disabled = { (brandManager.brands.length === 0) ? true : false } value={brandManager.email}>
          {brandManager.email + ' <' + brandManager.name + '>' + ' - (' + brandManager.brands.length + ') Brands'}
        </option>
      );
    });
    const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const campaignList = campaigns.map((campaign, index) => {
      return (
        <tr onClick={() => {alert('Promos:\n' + JSON.stringify(campaign.cashback_promos).split(',').join('\n'));}} className = {campaign.status}>
          <td>
            {index}
          </td>
          <td>
            {campaign.name}
          </td>
          <td>
            {parseInt(campaign.active_from.split('-')[2].slice(0, 2), 10) + ', ' + monthMap[parseInt(campaign.active_from.split('-')[1], 10) - 1] + '`' + parseInt(campaign.active_from.split('-')[0].slice(2, 4), 10) + ', ' + campaign.active_from.split('T')[1].slice(0, 5) }
          </td>
          <td>
            {parseInt(campaign.active_to.split('-')[2].slice(0, 2), 10) + ', ' + monthMap[parseInt(campaign.active_to.split('-')[1], 10) - 1] + '`' + parseInt(campaign.active_to.split('-')[0].slice(2, 4), 10) + ', ' + campaign.active_to.split('T')[1].slice(0, 5) }
          </td>
          <td>
            {parseInt(campaign.created_at.split('-')[2].slice(0, 2), 10) + ', ' + monthMap[parseInt(campaign.created_at.split('-')[1], 10) - 1] + '`' + parseInt(campaign.created_at.split('-')[0].slice(2, 4), 10) + ', ' + campaign.created_at.split('T')[1].slice(0, 5) }
          </td>
          <td>
            {campaign.type}
          </td>
          <td>
            {campaign.status}
          </td>
          <td>
            {campaign.budgeted_amount}
          </td>
          <td>
            {campaign.funds_credited}
          </td>
        </tr>
      );
    });

    const companyOptions = companies.map((company, index) => {
      return (
        <option key={index} value={company.name}>
          {company.name}
        </option>
      );
    });

    const reportForm = (
      <div className={styles.upload_report_container}>
        <div className={styles.heading}>
          upload report
        </div>
        <div className={styles.upload_report}>
          <input type="text" className={styles.input_title} placeholder="Report Title"/>
          <input type="file" className={styles.input_upload}/>
          <button className={styles.upload_btn}>upload</button>
        </div>
        <div className={styles.report_history_container}>
          <div className={styles.heading}>
            Report History
          </div>
          <div className={styles.report_list}>
            <div className={styles.indiv_report}>
              <p>
                Budget Report for Chivas regal
              </p>
              <p>
                <label>Dowload</label>
              </p>
              <div className="clearfix"></div>
              <label className={styles.upload_lab}>Uploaded at:<span></span></label>
            </div>
            <div className={styles.indiv_report}>
              <p>
                Budget Report for Chivas regal
              </p>
              <p>
                <label>Dowload</label>
              </p>
              <div className="clearfix"></div>
              <label className={styles.upload_lab}>Uploaded at:<span></span></label>
            </div>
          </div>
        </div>
      </div>
    );

    // Force re-rendering of children using key: http://stackoverflow.com/a/26242837
    return (
      <div className={styles.container}>
        <div className={styles.complete_container}>
          {/* Campaign selector*/}
          <CampaignMenu
            styles={styles}
            onBrandManagerChange={onBrandManagerChange}
            onValueChange={onValueChange}

            companyOptions={companyOptions}
            onCompanyChange={onCompanyChange}

            brandManagerOptions={brandManagerOptions}
            campaignName={campaignName}
            budgetedAmount={budgetedAmount}
            brandEmail={brandEmail}
            fundsCredited={fundsCredited}
            activeFrom={activeFrom}
            activeTo={activeTo}
            campaignStatus={campaignStatus}
            campaignList={campaignList}
            brandManagerCampaignMap={brandManagerCampaignMap}
            brandManagerBrandMap={brandManagerBrandMap}
            />
          {/* Report container*/}
          {/* TODO: enable the report form onces it done.*/}
          {null && reportForm}
          {/* Promos for a given */}
          <div className={styles.promo_container}>
            <PromoSelectionMenu
              styles={styles}
              promos={promos}
              onEditPromo={onEditPromo}
              onAddPromo={onAddPromo}
              onRemovePromo={onRemovePromo}
            />
            {/* Promo Details for the given promo*/}
            <PromoDetails
              styles={styles}
              currentEditingPromo={currentEditingPromo}
              promos={promos}
              brands={brands}
              isPromoSectionShown={isPromoSectionShown}
              onChangePromoInfo={onChangePromoInfo}
              onChangePromoObjInfo={onChangePromoObjInfo}
              fundsCredited={fundsCredited}
              activeFrom={activeFrom}
              activeTo={activeTo}
            />
            <div className={styles.save_promo_lay}>
              <button onClick={onSubmitData.bind(this, {
                brandEmail: brandEmail,
                campaignName: campaignName,
                budgetedAmount: budgetedAmount,
                fundsCredited: fundsCredited,
                minAmount: 1,
                activeFrom: activeFrom,
                activeTo: activeTo,
                campaignStatus: campaignStatus,
                promos: promos,
                brandManagerIdMap: brandManagerIdMap,
                brandManagerBrandMap: brandManagerBrandMap,
              })}>Save Promo</button>
            </div>
          </div>
        </div>
      </div>);
  }
}
