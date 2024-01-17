'use client';
import style from './queryForm.module.scss';
import Tips from './components/tips/tips';
import LeagueDrawer from './components/leagueDrawer/leagueDrawer';

function FormContent() {
    return (
        <div className={style.formContent}>
            <Tips />
            <div className={style.formSelect}>
                <LeagueDrawer />
            </div>
        </div>
    );
}

function QueryForm() {
    return (
        <div className={style.queryForm}>
            <FormContent />
        </div>
    );
}

export default QueryForm;
