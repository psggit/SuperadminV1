Customer Transactions
    -> Customer Transactions Landing Page
        ->  Contains
            1. Recharges
            2. Redemptions
            3. Reservations
            4. Add Credits
    -> Recharges
        -> Show all the recharges happened till now sort by latest one with the pagination 
          -> Two types of recharges
            -> 1. Payment Recharges
            -> 2. Gift Recharges
          -> If searched then apply filters accordingly


Component Structure
    Based on the filter also (Router)
    <Wrapper onClickListener FetchCount>
      <Search>      // Search affects results and pagination
      <Results>     // Renders a result set
      <Pagination>  // Renders the current selected page with number of pages available
    </Wrapper>

------------------------------ Problems --------------------------------

1. Pagination
    States required

        1. Total elements required in a page (Limit)
        2. Total Results 
        3. Current Page (Will be helpful for the offset)

        To compute: 
          Current Page
    Verdict: Is Pagination a dumb component (Does not know how to fetch state) or a smart component (Knows how to fetch the state)

2. Wrapper 
    On Click Listener for pagination buttons 

