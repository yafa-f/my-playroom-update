export const Add = (props) => {
    
  return (
    <div>
      {success && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          sx={{ width: "170px", alignContent: "center", margin: "auto" }}
          severity="success"
        >
          !הנתונים נשמרו בהצלחה
        </Alert>
      )}
       <Box
        margin="auto"
        height={300}
        width={200}
        my={4}
        display="column"
        alignContent="center"
        gap={4}
        p={2}
        sx={{ border: "2px solid grey", display: "table" }}
      >
        <Button
          onClick={() => {
            props.hideComponent();
          }}
          sx={{
            fontFamily: "sans-serif",
            fontSize: "22px",
            color: "red",
            marginLeft: "-18px",
            marginTop: "-11px",
            borderRadius: "0px",
            marginBottom: "-10px",
          }}
        >
          x
        </Button>

        {Object.keys(props.row).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type="text"
              value={updatedValues[key]}
              onChange={(e) => handleInputChange(e, key)}
            />
          </div>
        ))}
        <button onClick={handleSave}>שמירה</button>
      </Box>
    </div>
  );
};
