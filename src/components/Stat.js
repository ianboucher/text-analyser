import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

export default function Stat(props) {
    const { statName, statValue, id } = props;

    return (
        <Card elevation={3}>
            <CardHeader title={statName} id={`${id}-title`} data-testid={`${id}-title`} />
            <CardContent id={`${id}-value`} data-testid={`${id}-value`}>
                <Typography>{getDisplayValue(statValue)}</Typography>
            </CardContent>
        </Card>
    );
}

function getDisplayValue(statValue) {
    if (Array.isArray(statValue) && statValue.length) {
        return (statValue.length > 1) ? statValue.join(", ") : statValue[0];
    }

    return statValue ?? "--";
}